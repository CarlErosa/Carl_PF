'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const W = 420;
const H = 280;
const PADDLE_W = 8;
const PADDLE_H = 60;
const BALL = 8;
const WIN_SCORE = 5;

export default function Pong() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scores, setScores] = useState({ player: 0, ai: 0 });
  const [gameOver, setGameOver] = useState(false);

  const stateRef = useRef({
    ball: { x: W / 2, y: H / 2 },
    vel: { x: 3, y: 2 },
    player: H / 2 - PADDLE_H / 2,
    ai: H / 2 - PADDLE_H / 2,
    playerScore: 0,
    aiScore: 0,
  });
  const overRef = useRef(false);
  const upRef = useRef(false);
  const downRef = useRef(false);

  const resetBall = useCallback(() => {
    const s = stateRef.current;
    s.ball = { x: W / 2, y: H / 2 };
    s.vel = { x: (Math.random() > 0.5 ? 1 : -1) * 3, y: (Math.random() > 0.5 ? 1 : -1) * 2 };
  }, []);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const s = stateRef.current;
    ctx.fillStyle = '#0b0b0f';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(W / 2, 0);
    ctx.lineTo(W / 2, H);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, s.player, PADDLE_W, PADDLE_H);
    ctx.fillRect(W - PADDLE_W, s.ai, PADDLE_W, PADDLE_H);
    ctx.fillRect(s.ball.x, s.ball.y, BALL, BALL);
  }, []);

  useEffect(() => {
    resetBall();
    draw();
    const id = setInterval(() => {
      if (overRef.current) return;
      const s = stateRef.current;
      if (upRef.current) s.player = Math.max(0, s.player - 4);
      if (downRef.current) s.player = Math.min(H - PADDLE_H, s.player + 4);
      const target = s.ball.y - PADDLE_H / 2;
      if (s.ai < target - 3) s.ai = Math.min(H - PADDLE_H, s.ai + 2.5);
      else if (s.ai > target + 3) s.ai = Math.max(0, s.ai - 2.5);

      s.ball.x += s.vel.x;
      s.ball.y += s.vel.y;
      if (s.ball.y <= 0 || s.ball.y >= H - BALL) {
        s.ball.y = Math.max(0, Math.min(H - BALL, s.ball.y));
        s.vel.y *= -1;
      }
      if (s.ball.x <= PADDLE_W && s.ball.x >= 0 && s.ball.y + BALL > s.player && s.ball.y < s.player + PADDLE_H) {
        s.ball.x = PADDLE_W;
        s.vel.x = Math.abs(s.vel.x);
      }
      if (
        s.ball.x + BALL >= W - PADDLE_W &&
        s.ball.x + BALL <= W &&
        s.ball.y + BALL > s.ai &&
        s.ball.y < s.ai + PADDLE_H
      ) {
        s.ball.x = W - PADDLE_W - BALL;
        s.vel.x = -Math.abs(s.vel.x);
      }
      if (s.ball.x < -10) {
        s.aiScore += 1;
        setScores({ player: s.playerScore, ai: s.aiScore });
        if (s.aiScore >= WIN_SCORE) {
          overRef.current = true;
          setGameOver(true);
          return;
        }
        resetBall();
      }
      if (s.ball.x > W + 10) {
        s.playerScore += 1;
        setScores({ player: s.playerScore, ai: s.aiScore });
        if (s.playerScore >= WIN_SCORE) {
          overRef.current = true;
          setGameOver(true);
          return;
        }
        resetBall();
      }
      draw();
    }, 16);
    return () => clearInterval(id);
  }, [resetBall, draw]);

  const reset = useCallback(() => {
    const s = stateRef.current;
    s.playerScore = 0;
    s.aiScore = 0;
    s.player = H / 2 - PADDLE_H / 2;
    s.ai = H / 2 - PADDLE_H / 2;
    setScores({ player: 0, ai: 0 });
    overRef.current = false;
    setGameOver(false);
    resetBall();
    draw();
  }, [resetBall, draw]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        upRef.current = true;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        downRef.current = true;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') upRef.current = false;
      if (e.key === 'ArrowDown') downRef.current = false;
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full items-center justify-between font-mono text-xs text-muted-foreground">
        <span>you {scores.player} : {scores.ai} ai</span>
        <span>first to {WIN_SCORE}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
        className="rounded-lg border border-line bg-[#0b0b0f]"
      />
      {gameOver && (
        <p className="font-mono text-xs text-red-500">
          {scores.player > scores.ai ? 'you win' : 'ai wins'}
        </p>
      )}
      <button
        onClick={reset}
        className="rounded-lg border border-line px-4 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        restart
      </button>
    </div>
  );
}

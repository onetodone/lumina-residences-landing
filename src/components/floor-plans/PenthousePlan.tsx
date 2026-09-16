type FloorPlanProps = {
  className?: string
}

const rooms = [
  { x: 8, y: 8, w: 120, h: 70, label: 'Great Room' },
  { x: 8, y: 82, w: 76, h: 38, label: 'Kitchen / Island' },
  { x: 88, y: 82, w: 40, h: 38, label: 'Study' },
  { x: 8, y: 124, w: 224, h: 28, label: 'Rooftop Terrace' },
  { x: 132, y: 8, w: 56, h: 52, label: 'Primary Suite' },
  { x: 132, y: 64, w: 56, h: 24, label: 'Walk-in Closet' },
  { x: 192, y: 8, w: 40, h: 40, label: 'Primary Bath' },
  { x: 192, y: 52, w: 40, h: 36, label: 'Bedroom 2' },
  { x: 132, y: 92, w: 40, h: 28, label: 'Bedroom 3' },
  { x: 176, y: 92, w: 56, h: 28, label: 'Bath' },
]

/** Abstract line-art floor plan for the Penthouse type (SPEC.md section 4C). Purely illustrative, not to exact scale. */
export function PenthousePlan({ className }: FloorPlanProps) {
  return (
    <svg viewBox="0 0 240 160" aria-hidden className={className}>
      <rect x="4" y="4" width="232" height="152" fill="none" className="stroke-border" strokeWidth="1.5" />
      {rooms.map((room) => (
        <g key={room.label}>
          <rect
            x={room.x}
            y={room.y}
            width={room.w}
            height={room.h}
            fill="none"
            className="stroke-gold/40"
            strokeWidth="1.25"
          />
          <text x={room.x + 4} y={room.y + 11} className="fill-muted-foreground text-[6px] tracking-wide uppercase">
            {room.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

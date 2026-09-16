type FloorPlanProps = {
  className?: string
}

const rooms = [
  { x: 8, y: 8, w: 160, h: 144, label: 'Living / Sleeping' },
  { x: 176, y: 8, w: 56, h: 60, label: 'Bath' },
  { x: 176, y: 76, w: 56, h: 76, label: 'Balcony' },
  { x: 20, y: 100, w: 60, h: 40, label: 'Kitchen' },
]

/** Abstract line-art floor plan for the Studio type (SPEC.md section 4C). Purely illustrative, not to exact scale. */
export function StudioPlan({ className }: FloorPlanProps) {
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
          <text x={room.x + 6} y={room.y + 14} className="fill-muted-foreground text-[8px] tracking-wide uppercase">
            {room.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

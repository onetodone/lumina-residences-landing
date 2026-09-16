type FloorPlanProps = {
  className?: string
}

const rooms = [
  { x: 8, y: 8, w: 130, h: 78, label: 'Living / Dining' },
  { x: 8, y: 90, w: 130, h: 62, label: 'Kitchen' },
  { x: 142, y: 8, w: 90, h: 60, label: 'Primary Bedroom' },
  { x: 142, y: 72, w: 90, h: 34, label: 'Ensuite Bath' },
  { x: 142, y: 110, w: 58, h: 42, label: 'Bedroom 2' },
  { x: 204, y: 110, w: 28, h: 42, label: 'Bath' },
]

/** Abstract line-art floor plan for the 2 Bedroom type (SPEC.md section 4C). Purely illustrative, not to exact scale. */
export function TwoBedPlan({ className }: FloorPlanProps) {
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
          <text x={room.x + 5} y={room.y + 13} className="fill-muted-foreground text-[7.5px] tracking-wide uppercase">
            {room.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

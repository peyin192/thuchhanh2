import { useState } from "react";

const RADIUS = 80;      // bán kính vòng
const STROKE = 28;      // độ dày vòng

function DonutChart({ title, items }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  const total = items.reduce((sum, it) => sum + it.value, 0) || 1;
  const circumference = 2 * Math.PI * RADIUS;

  // chuẩn bị dữ liệu cho từng segment
  let offsetAcc = 0;
  const segments = items.map((item) => {
    const length = (item.value / total) * circumference;
    const segment = {
      length,
      offset: offsetAcc,
      color: item.color,
    };
    offsetAcc += length;
    return segment;
  });

  const activeItem =
    hoverIndex !== null ? items[hoverIndex] : null;

  return (
    <div className="chart-box">
      <div className="donut-wrapper">
        <svg
          className="donut-svg"
          viewBox="0 0 210 210"
        >
          {/* quay -90 độ để bắt đầu ở trên đỉnh như design */}
          <g transform="rotate(-90 105 105)">
            {segments.map((seg, index) => {
              const isActive = hoverIndex === index;
              const radius = RADIUS + (isActive ? 2 : 0); // nổi lên nhẹ
              const strokeWidth = isActive ? STROKE + 4 : STROKE;

              // nếu value = 0 thì bỏ qua, khỏi vẽ
              if (seg.length <= 0) return null;

              return (
                <circle
                  key={index}
                  cx={105}
                  cy={105}
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${seg.length} ${circumference}`}
                  strokeDashoffset={-seg.offset}
                  style={{
                    cursor: "pointer",
                    transition: "all 0.2s ease-out",
                  }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                />
              );
            })}
          </g>
        </svg>

        {/* % ở giữa + tooltip đen bên cạnh */}
        {activeItem && (
          <>
            <div className="donut-center">
              {/* <span>{activeItem.value}%</span> */}
            </div>
            <div className="donut-tooltip">
              {activeItem.label}: {activeItem.value}%
            </div>
          </>
        )}
      </div>

      <h4 className="chart-title">{title}</h4>

      {/* legend, hover vào cũng sync với vòng */}
      <div className="legend">
        {items.map((item, index) => (
          <div
            key={item.label}
            className="legend-row"
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <span
              className="dot"
              style={{ backgroundColor: item.color }}
            ></span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonutChart;

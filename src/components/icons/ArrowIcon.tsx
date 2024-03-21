import { memo } from "react"
import Svg, { Path, type SvgProps } from "react-native-svg"

const ArrowIcon = ({ width = 6, height = 9, stroke = "#fff", ...props }: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...props}>
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m.983 8.037 3.75-3.68L.983.68"
    />
  </Svg>
)

export default memo(ArrowIcon)

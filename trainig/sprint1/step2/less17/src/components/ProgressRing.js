import React from 'react';

const RADIUS = 120;
const STROKE = 6;
const DEFAULT_CIRCLE_FILL = 0.75;

export class ProgressRing extends React.Component {
  constructor(props) {
    super(props);

    this.normalizedRadius = RADIUS - STROKE * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  render() {
    const { progress } = this.props;

    const strokeDashoffset =
      this.circumference - (progress / 100) * this.circumference * DEFAULT_CIRCLE_FILL;
    const defaultStrokeDashoffset = this.circumference - this.circumference * DEFAULT_CIRCLE_FILL;

    return (
      <svg className={this.props.className} height={RADIUS * 2} width={RADIUS * 2}>
        <circle
          stroke="#EBEBEB"
          fill="transparent"
          strokeWidth={STROKE}
          strokeDasharray={this.circumference + ' ' + this.circumference}
          style={{ strokeDashoffset: defaultStrokeDashoffset }}
          r={this.normalizedRadius}
          cx={RADIUS}
          cy={RADIUS}
        />
        <circle
          stroke="#3C39EC"
          fill="transparent"
          strokeWidth={STROKE}
          strokeDasharray={this.circumference + ' ' + this.circumference}
          style={{ strokeDashoffset }}
          r={this.normalizedRadius}
          cx={RADIUS}
          cy={RADIUS}
        />
      </svg>
    );
  }
}
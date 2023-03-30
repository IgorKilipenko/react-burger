import clsx from 'clsx';
import commonStyles from './common.module.css';

const Box = (props) => {
  const { className, p=1, vCenter=true, hCenter=true, children, ...otherProps } = props
  const classes = clsx(
    className,
    commonStyles.flex,
    vCenter && commonStyles.flexVCenter,
    hCenter && commonStyles.flexHCenter,
    p && `p-${p}`,
  )
  return (
    <div {...{className:classes, ...otherProps}}>
      {children}
    </div>
  )
}

export default Box
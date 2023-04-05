import PropTypes from "prop-types"

export const AppHeaderPropType = {
  maxContentWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChangeHeight: PropTypes.func,
}

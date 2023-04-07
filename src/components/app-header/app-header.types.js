import PropTypes from "prop-types"

export const AppHeaderPropType = {
  variant: PropTypes.oneOf(['desktop', 'mobile']),
  onChangeHeight: PropTypes.func,
}

class SettingsMenu extends React.Component {
  state = {
    theme: 'dark',
    userSettings: {
      notificationsEnabled: true,
      sidebar: {
        title: 'Боковая панель',
        enabled: false,
      },
    },
  }

  toggleSidebar = () => {
    this.setState((prevState) => ({
      ...prevState,
      userSettings: {
        ...prevState.userSettings,
        sidebar: {
          ...prevState.userSettings.sidebar,
          enabled: !prevState.userSettings.sidebar.enabled,
        },
      },
    }))
  }

  render() {
    const { enabled } = this.state.userSettings.sidebar
    return (
      <>
        {enabled && <aside className="aside" />}
        <section className="content">
          <button className="content__button" onClick={this.toggleSidebar}>
            {enabled ? 'Выключить' : 'Включить'}
          </button>
        </section>
      </>
    )
  }
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<SettingsMenu />)

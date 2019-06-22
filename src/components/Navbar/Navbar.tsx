import React from 'react';
import { StateContext } from '../StateProvider/StateProvider';
import { Navbar, 
    NavbarDivider, 
    NavbarGroup, 
    Tabs, 
    Tab,
    Button,
    Classes,
    Alignment,
    TabId,
    Intent,
    NavbarHeading
} from '@blueprintjs/core';
import { AppNotification } from '../Notifications/Notifications';



export class AppNavbar extends React.Component<any,any> {
    static contextType = StateContext;

    handleNavbarTabChange = (selectedTabId: TabId) => {
        const [state, dispatch] = this.context;
        dispatch({ navbarTabId: selectedTabId });
        this.props.history.push('/' + selectedTabId);
    }

    handleToggleTheme = (theme: string) => {
        const [state, dispatch] = this.context;
        if (theme === "bp3-dark") {
            dispatch({theme: "bp3-light"});
            AppNotification.show({ icon: 'lightbulb', message: 'Light theme activated', intent: Intent.SUCCESS});
        } else {
            dispatch({theme: "bp3-dark"});
            AppNotification.show( {icon: 'lightbulb', message: 'Dark theme activated', intent: Intent.SUCCESS});
        }
    }

    render() {
        const [state, dispatch] = this.context;
        return(
            <Navbar className={state.theme} fixedToTop>
                <NavbarGroup align={Alignment.LEFT}>
                    <NavbarHeading>SDN Adapter Designer</NavbarHeading>
                </NavbarGroup>
                <NavbarGroup align={Alignment.RIGHT}>
                    <Tabs
                        animate={true}
                        id="tab-nav-bar"
                        large={true}
                        onChange={this.handleNavbarTabChange}
                        selectedTabId={state.navbarTabId}
                    >
                        <Tab id="configuration" title="Configuration"/>
                        {/* <Tab id="About" title="About"/> */}


                    </Tabs>
                    <NavbarDivider />
                    <Button className={Classes.MINIMAL} icon="lightbulb"
                        onClick={()=> this.handleToggleTheme(state.theme)}
                    />
                    {/* <Button className={classes.MINIMAL} icon="log-out"
                        onClick={()=> handleLogout()}
                    /> */}

                </NavbarGroup>
            </Navbar>
        );
    }
}
import React, { Fragment } from "react";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import "./AuthenticationPage.css";

function AuthenticationPage(props) {
    return (<Fragment>
        {props.isLargeScreen ? (
            <div id="large-screen-authentication">
                {props.currentPage === "SignInPage" ? (
                    <SignInPage
                        auth={props.auth}
                        user={props.user}
                        onChangePage={props.onChangePage} />
                ) : null}
                {props.currentPage === "SignUpPage" ? (
                    <SignUpPage
                        auth={props.auth}
                        user={props.user}
                        onChangePage={props.onChangePage} />
                ) : null}
            </div>
        ) :
            <div>
                {props.currentPage === "SignInPage" ? (
                    <SignInPage
                        auth={props.auth}
                        user={props.user}
                        onChangePage={props.onChangePage}
                    />
                ) : null}
                {props.currentPage === "SignUpPage" ? (
                    <SignUpPage
                        auth={props.auth}
                        user={props.user}
                        onChangePage={props.onChangePage} />
                ) : null}
            </div>}
    </Fragment>
  );
}

export default AuthenticationPage;

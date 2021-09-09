import React from 'react';
import {Card} from "react-bootstrap";

class Welcome extends React.Component{
    render() {
        return (
            <Card>
                <h1>Hello Welcome!!!</h1>
                <p>
                    Migrating users can fill many application developers with dread. Auth0 provides multiple options to migrate them all at once, or gradually as they log-in. We make it easy for you, with zero disruption for your users.
                </p>
                <footer className="blockquote-footer">
                    James Mitchell TC
                </footer>
            </Card>

        );
    }
}

export default  Welcome;
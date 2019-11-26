import React, {Component} from "react";
import {dlog} from "../AppHelpers";

import COMPONENTS from "../../environments/mapping";
import {Area, makeSpaPage} from "@magnolia/magnolia-react-renderer";

class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            areaVisible: true,
            templateDefinitions: null
        }
    }

    render() {
        dlog("render PageStandard.");
        dlog("page context", this.context);
        let mainAreaContent = this.props.content.main;
        let secondaryAreaContent = this.props.content.secondary;

        return (
            <div className="content-background">
                <div className="container">
                    <h1 className="bd-title">{this.props.content.title}</h1>
                    <div>
                        <h2>Primary Area</h2>
                        <div className="col-12">
                            <Area key={"main"} content={mainAreaContent} />
                        </div>
                    </div>
                    {
                        this.state.areaVisible ?
                            <div>
                                <h2>Secondary Area</h2>
                                <div className="col-12">
                                    <Area key={"secondary"} content={secondaryAreaContent} />
                                </div>
                            </div>
                            : null
                    }
                    <div>
                        <h2>Single component area</h2>
                        <div className="col-12">
                            <Area key={'single'} content={this.props.content.single} />
                        </div>
                    </div>

                    <button className="btn btn-danger" onClick={() => this.toggleArea()}>Click me</button>
                </div>
            </div>
        );
    }

    toggleArea() {
        this.setState({areaVisible: !this.state.areaVisible})
    }
}

export default makeSpaPage(Page, COMPONENTS);

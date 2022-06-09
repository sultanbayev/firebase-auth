import React from "react";
import { Button, Spinner } from "react-bootstrap";

const ButtonWithLoading = ({ title = "Submit", isLoading, ...props }) => {
    return (
        <Button {...props}>
            { isLoading && ( <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> ) }
            <span className="ms-2"> { isLoading ? 'Loading...' : title } </span>
        </Button>
    );
}

export default React.memo(ButtonWithLoading);
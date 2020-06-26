import React from 'react';

export default function CtaButton(props) {
    return <button type="submit" onClick={() => {
        if (props.callbackFn) {
            props.callbackFn()
        }
        return
    }}>{props.label}</button>;
}

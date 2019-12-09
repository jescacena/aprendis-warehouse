import React from 'react';

export default function SplitPane(props) {
    return (
        <main className={'App ' + props.customClass}>
            <section className="products">
                {props.left}
            </section>
            <aside className="summary">
                {props.right}
            </aside>
        </main>
    );
}

import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

function Tabs({ defaultIndex = 0, children, onChange }) {
    const [currentIndex, setCurrentIndex] = useState(defaultIndex);
    const prevIndex = useRef(defaultIndex);

    const tabs = React.Children.toArray(children);

    useEffect(() => {
        if (prevIndex.current !== currentIndex) {
            onChange(currentIndex);
        }
        prevIndex.current = currentIndex;
    }, [currentIndex, onChange]);

    return (
        <div className="tabs-container">
            <div className="tabs-list">
                {/* <button className="tab-item">Tab 1</button>
                <button className="tab-item">Tab 2</button>
                <button className="tab-item">Tab 3</button> */}

                {tabs.map((child, index) => {
                    const active = currentIndex === index;
                    return (
                        <button
                            key={index}
                            className="tab-item"
                            style={{
                                color: active ? "red" : "#333",
                                fontWeight: active ? "bold" : "normal",
                            }}
                            onClick={() => setCurrentIndex(index)}
                        >
                            {child.props.title}
                        </button>
                    );
                })}
            </div>

            <div className="tabs-content">{tabs[currentIndex]}</div>
        </div>
    );
}

Tabs.propTypes = {
    children: PropTypes.node.isRequired,
    defaultIndex: PropTypes.number,
    onChange: PropTypes.func,
};

export default Tabs;

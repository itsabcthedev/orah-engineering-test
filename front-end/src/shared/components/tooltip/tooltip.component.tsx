import React from "react";
import styled from "styled-components";
import { Colors } from "shared/styles/colors"
import { BorderRadius, FontWeight, Spacing } from "shared/styles/styles"

const T = {
    ToolTipText: styled.span`
    visibility: hidden;
    background-color: ${Colors.neutral.lighter};
    box-shadow: 0 2px 7px rgba(5, 66, 145, 0.13);
    color: ${Colors.dark.base};
    text-align: center;
    font-weight: ${FontWeight.strong};
    white-space:nowrap;
    border-radius: ${BorderRadius.default};
    padding: 0.5rem 1.5rem;
    position: absolute;
    z-index: 1;
    bottom: 130%;
    left: 50%;
    margin-left: -60px;
    &:after {
        content: "";
        position: absolute;
        top: 100%;
        left: 20%;
        border-width: 5px;
        border-style: solid;
        border-color: ${Colors.neutral.base} transparent transparent transparent;
    }`,
    ToolTipContainer: styled.div` 
    position: relative;
    display: inline-block;
    &:hover span {
        visibility: visible
    }`
}


interface ToolTipProps {
    children: JSX.Element
    toolTipText: string;
}

const ToolTip = (props: ToolTipProps) => (
    <T.ToolTipContainer>
        {props.children}
        <T.ToolTipText>{props.toolTipText}</T.ToolTipText>
    </T.ToolTipContainer>
);

export default ToolTip;

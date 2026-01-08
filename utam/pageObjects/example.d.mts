
import { Driver as _Driver, Element as _Element, Locator as _Locator, BaseUtamElement as _BaseUtamElement, UtamBaseRootPageObject as _UtamBaseRootPageObject, ActionableUtamElement as _ActionableUtamElement, ClickableUtamElement as _ClickableUtamElement, EditableUtamElement as _EditableUtamElement } from '@utam/core';

/**
 * Page Object: page object name
 * Root element: html
 * generated from JSON __utam__/example.utam.json
 * @version 2026-01-08T06:02:17.648Z
 * @author UTAM generator
 */
export default class Example extends _UtamBaseRootPageObject {
    constructor(driver: _Driver, element?: _Element, locator?: _Locator);
    getTitle(): Promise<(_BaseUtamElement)>;
    getScriptContent(): Promise<(_BaseUtamElement)>;
    getStyleContent(): Promise<(_BaseUtamElement)>;
    getStyleContent1(): Promise<(_BaseUtamElement)>;
    getStyleContent2(): Promise<(_BaseUtamElement)>;
    getSpanContent(): Promise<(_BaseUtamElement)>;
    getDismissError(): Promise<(_BaseUtamElement & _ActionableUtamElement & _ClickableUtamElement)>;
    getSpanContent1(): Promise<(_BaseUtamElement)>;
    getAuraErrorTitleContent(): Promise<(_BaseUtamElement)>;
    getAuraErrorMessageContent(): Promise<(_BaseUtamElement)>;
    getAuraErrorReload(): Promise<(_BaseUtamElement & _ActionableUtamElement & _ClickableUtamElement)>;
    getLabelContent(): Promise<(_BaseUtamElement)>;
    getInput(): Promise<(_BaseUtamElement & _ActionableUtamElement & _ClickableUtamElement & _EditableUtamElement)>;
    getListItem(): Promise<(_BaseUtamElement & _ActionableUtamElement & _ClickableUtamElement)>;
    getListItem1(): Promise<(_BaseUtamElement & _ActionableUtamElement & _ClickableUtamElement)>;
    getSpanContent2(): Promise<(_BaseUtamElement)>;
    getListItem2(): Promise<(_BaseUtamElement & _ActionableUtamElement & _ClickableUtamElement)>;
    getListItem3(): Promise<(_BaseUtamElement & _ActionableUtamElement & _ClickableUtamElement)>;
    getListItem4(): Promise<(_BaseUtamElement & _ActionableUtamElement & _ClickableUtamElement)>;
    getListItem5(): Promise<(_BaseUtamElement & _ActionableUtamElement & _ClickableUtamElement)>;
    getDivContent(): Promise<(_BaseUtamElement)>;
    getStyleContent3(): Promise<(_BaseUtamElement)>;
    getStyleContent4(): Promise<(_BaseUtamElement)>;
    getScriptContent1(): Promise<(_BaseUtamElement)>;
    getScriptContent2(): Promise<(_BaseUtamElement)>;
    getScriptContent3(): Promise<(_BaseUtamElement)>;
}

'use strict';

var core = require('@utam/core');

async function _utam_get_title(driver, root) {
    let _element = root;
    const _locator = core.By.css("title");
    return _element.findElement(_locator);
}

async function _utam_get_scriptContent(driver, root) {
    let _element = root;
    const _locator = core.By.css("script");
    return _element.findElement(_locator);
}

async function _utam_get_styleContent(driver, root) {
    let _element = root;
    const _locator = core.By.css("style");
    return _element.findElement(_locator);
}

async function _utam_get_styleContent1(driver, root) {
    let _element = root;
    const _locator = core.By.css("style:nth-of-type(2)");
    return _element.findElement(_locator);
}

async function _utam_get_styleContent2(driver, root) {
    let _element = root;
    const _locator = core.By.css("style:nth-of-type(3)");
    return _element.findElement(_locator);
}

async function _utam_get_auraLoadingBox(driver, root) {
    let _element = root;
    const _locator = core.By.css("div#auraLoadingBox");
    return _element.findElement(_locator);
}

async function _utam_get_spanContent(driver, root) {
    let _element = await _utam_get_auraLoadingBox(driver, root);
    const _locator = core.By.css("span");
    return _element.findElement(_locator);
}

async function _utam_get_auraErrorMask(driver, root) {
    let _element = root;
    const _locator = core.By.css("div#auraErrorMask");
    return _element.findElement(_locator);
}

async function _utam_get_auraError(driver, root) {
    let _element = await _utam_get_auraErrorMask(driver, root);
    const _locator = core.By.css("div#auraError");
    return _element.findElement(_locator);
}

async function _utam_get_dismissError(driver, root) {
    let _element = await _utam_get_auraError(driver, root);
    const _locator = core.By.css("a#dismissError");
    return _element.findElement(_locator);
}

async function _utam_get_spanContent1(driver, root) {
    let _element = await _utam_get_dismissError(driver, root);
    const _locator = core.By.css("span");
    return _element.findElement(_locator);
}

async function _utam_get_auraErrorTitleContent(driver, root) {
    let _element = await _utam_get_auraError(driver, root);
    const _locator = core.By.css("span#auraErrorTitle");
    return _element.findElement(_locator);
}

async function _utam_get_auraErrorMessageContent(driver, root) {
    let _element = await _utam_get_auraError(driver, root);
    const _locator = core.By.css("div#auraErrorMessage");
    return _element.findElement(_locator);
}

async function _utam_get_auraErrorReload(driver, root) {
    let _element = await _utam_get_auraError(driver, root);
    const _locator = core.By.css("a#auraErrorReload");
    return _element.findElement(_locator);
}

async function _utam_get_iconstage(driver, root) {
    let _element = root;
    const _locator = core.By.css("div#iconstage");
    return _element.findElement(_locator);
}

async function _utam_get_header(driver, root) {
    let _element = await _utam_get_iconstage(driver, root);
    const _locator = core.By.css("header");
    return _element.findElement(_locator);
}

async function _utam_get_labelContent(driver, root) {
    let _element = await _utam_get_header(driver, root);
    const _locator = core.By.css("label");
    return _element.findElement(_locator);
}

async function _utam_get_input(driver, root) {
    let _element = await _utam_get_header(driver, root);
    const _locator = core.By.css("input");
    return _element.findElement(_locator);
}

async function _utam_get_list(driver, root) {
    let _element = await _utam_get_header(driver, root);
    const _locator = core.By.css("ul");
    return _element.findElement(_locator);
}

async function _utam_get_listItem(driver, root) {
    let _element = await _utam_get_list(driver, root);
    const _locator = core.By.css("li");
    return _element.findElement(_locator);
}

async function _utam_get_list1(driver, root) {
    let _element = await _utam_get_header(driver, root);
    const _locator = core.By.css("ul:nth-of-type(2)");
    return _element.findElement(_locator);
}

async function _utam_get_listItem1(driver, root) {
    let _element = await _utam_get_list1(driver, root);
    const _locator = core.By.css("li");
    return _element.findElement(_locator);
}

async function _utam_get_spanContent2(driver, root) {
    let _element = await _utam_get_listItem1(driver, root);
    const _locator = core.By.css("span");
    return _element.findElement(_locator);
}

async function _utam_get_listItem2(driver, root) {
    let _element = await _utam_get_list1(driver, root);
    const _locator = core.By.css("li:nth-of-type(2)");
    return _element.findElement(_locator);
}

async function _utam_get_listItem3(driver, root) {
    let _element = await _utam_get_list1(driver, root);
    const _locator = core.By.css("li:nth-of-type(3)");
    return _element.findElement(_locator);
}

async function _utam_get_listItem4(driver, root) {
    let _element = await _utam_get_list1(driver, root);
    const _locator = core.By.css("li:nth-of-type(4)");
    return _element.findElement(_locator);
}

async function _utam_get_listItem5(driver, root) {
    let _element = await _utam_get_list1(driver, root);
    const _locator = core.By.css("li:nth-of-type(5)");
    return _element.findElement(_locator);
}

async function _utam_get_container(driver, root) {
    let _element = await _utam_get_iconstage(driver, root);
    const _locator = core.By.css("div#spinner-container");
    return _element.findElement(_locator);
}

async function _utam_get_divContent(driver, root) {
    let _element = root;
    const _locator = core.By.css("div");
    return _element.findElement(_locator);
}

async function _utam_get_styleContent3(driver, root) {
    let _element = root;
    const _locator = core.By.css("style:nth-of-type(4)");
    return _element.findElement(_locator);
}

async function _utam_get_styleContent4(driver, root) {
    let _element = root;
    const _locator = core.By.css("style:nth-of-type(5)");
    return _element.findElement(_locator);
}

async function _utam_get_scriptContent1(driver, root) {
    let _element = root;
    const _locator = core.By.css("script:nth-of-type(2)");
    return _element.findElement(_locator);
}

async function _utam_get_scriptContent2(driver, root) {
    let _element = root;
    const _locator = core.By.css("script:nth-of-type(3)");
    return _element.findElement(_locator);
}

async function _utam_get_scriptContent3(driver, root) {
    let _element = root;
    const _locator = core.By.css("script:nth-of-type(4)");
    return _element.findElement(_locator);
}

/**
 * Page Object: page object name
 * Root element: html
 * generated from JSON __utam__/example.utam.json
 * @version 2026-01-08T06:02:17.648Z
 * @author UTAM generator
 */
class Example extends core.UtamBaseRootPageObject {
    constructor(driver, element, locator = core.By.css("html")) {
        super(driver, element, locator);
    }

    async __getRoot() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        return new BaseUtamElement(driver, root);
    }
    
    async getTitle() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_title(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getScriptContent() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_scriptContent(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getStyleContent() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_styleContent(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getStyleContent1() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_styleContent1(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getStyleContent2() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_styleContent2(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async __getAuraLoadingBox() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_auraLoadingBox(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getSpanContent() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_spanContent(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async __getAuraErrorMask() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_auraErrorMask(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async __getAuraError() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_auraError(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getDismissError() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const ActionableClickableUtamElement = core.createUtamMixinCtor(core.ActionableUtamElement, core.ClickableUtamElement);
        let element = await _utam_get_dismissError(driver, root);
        element = new ActionableClickableUtamElement(driver, element);
        return element;
    }
    
    async getSpanContent1() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_spanContent1(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getAuraErrorTitleContent() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_auraErrorTitleContent(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getAuraErrorMessageContent() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_auraErrorMessageContent(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getAuraErrorReload() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const ActionableClickableUtamElement = core.createUtamMixinCtor(core.ActionableUtamElement, core.ClickableUtamElement);
        let element = await _utam_get_auraErrorReload(driver, root);
        element = new ActionableClickableUtamElement(driver, element);
        return element;
    }
    
    async __getIconstage() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_iconstage(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async __getHeader() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_header(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getLabelContent() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_labelContent(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getInput() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const ActionableClickableEditableUtamElement = core.createUtamMixinCtor(core.ActionableUtamElement, core.ClickableUtamElement, core.EditableUtamElement);
        let element = await _utam_get_input(driver, root);
        element = new ActionableClickableEditableUtamElement(driver, element);
        return element;
    }
    
    async __getList() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_list(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getListItem() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const ActionableClickableUtamElement = core.createUtamMixinCtor(core.ActionableUtamElement, core.ClickableUtamElement);
        let element = await _utam_get_listItem(driver, root);
        element = new ActionableClickableUtamElement(driver, element);
        return element;
    }
    
    async __getList1() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_list1(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getListItem1() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const ActionableClickableUtamElement = core.createUtamMixinCtor(core.ActionableUtamElement, core.ClickableUtamElement);
        let element = await _utam_get_listItem1(driver, root);
        element = new ActionableClickableUtamElement(driver, element);
        return element;
    }
    
    async getSpanContent2() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_spanContent2(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getListItem2() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const ActionableClickableUtamElement = core.createUtamMixinCtor(core.ActionableUtamElement, core.ClickableUtamElement);
        let element = await _utam_get_listItem2(driver, root);
        element = new ActionableClickableUtamElement(driver, element);
        return element;
    }
    
    async getListItem3() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const ActionableClickableUtamElement = core.createUtamMixinCtor(core.ActionableUtamElement, core.ClickableUtamElement);
        let element = await _utam_get_listItem3(driver, root);
        element = new ActionableClickableUtamElement(driver, element);
        return element;
    }
    
    async getListItem4() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const ActionableClickableUtamElement = core.createUtamMixinCtor(core.ActionableUtamElement, core.ClickableUtamElement);
        let element = await _utam_get_listItem4(driver, root);
        element = new ActionableClickableUtamElement(driver, element);
        return element;
    }
    
    async getListItem5() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const ActionableClickableUtamElement = core.createUtamMixinCtor(core.ActionableUtamElement, core.ClickableUtamElement);
        let element = await _utam_get_listItem5(driver, root);
        element = new ActionableClickableUtamElement(driver, element);
        return element;
    }
    
    async __getContainer() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_container(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getDivContent() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_divContent(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getStyleContent3() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_styleContent3(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getStyleContent4() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_styleContent4(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getScriptContent1() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_scriptContent1(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getScriptContent2() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_scriptContent2(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
    async getScriptContent3() {
        const driver = this.driver;
        const root = await this.getRootElement();
        const BaseUtamElement = core.createUtamMixinCtor();
        let element = await _utam_get_scriptContent3(driver, root);
        element = new BaseUtamElement(driver, element);
        return element;
    }
    
}

module.exports = Example;

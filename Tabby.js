function Tabby(selector, opts = {}) {
    this.uuid = this.id();

    this.listeners = [];

    this.selectedIndex = opts.selectedIndex || 0;
    this.wrapper = document.querySelector(selector);

    this.activeTabColor = opts.activeTabColor || "#fff";
    this.activeTabBG = opts.activeTabBG || "#333";
    this.tabsColor = opts.tabsColor || "#333";
    this.tabsBG = opts.tabsBG || "#bbb";

    if (!this.wrapper) {
        throw new Error("The given selector is incorrect.");
    }

    let tabLabelsList = this.wrapper.querySelector(".tabby-labels");
    this.tabLabels = [...tabLabelsList.querySelectorAll("label.tabby-label")];
    // console.log(this.tabLabels);

    let tabContentsList = this.wrapper.querySelector(".tabby-contents");
    this.tabContents = [...tabContentsList.querySelectorAll(".tabby-content")];
    // console.log(this.tabContents);

    let separator = this.wrapper.querySelector(".tabby-separator");

    if (!this.tabLabels.length || !this.tabContents.length) {
        throw new Error("No labels or contents found. Also be sure labels are HTML label tags.");
    }

    if (this.tabLabels.length !== this.tabContents.length) {
        throw new Error("Labels and contents mismatch in quantity.");
    }

    // Mark stuff with identified classes for encapsuled style
    tabLabelsList.classList.add("labels" + this.uuid);
    separator.classList.add("separator" + this.uuid);
    tabContentsList.classList.add("contents" + this.uuid);

    // Generate ids for triggers
    this.uuids = Array(this.tabLabels.length).fill(0).map(_ => this.id());

    // Set up the HTML attributes
    this.uuids.forEach((uuid, i) => {
        this.tabLabels[i].setAttribute("for", "trigger" + uuid);
        this.tabLabels[i].addEventListener("click", () =>
            this.listeners.forEach(listener => listener(i))
        );
        this.tabContents[i].id = "content" + uuid;
    });

    // Inject radio triggers
    this.uuids
        .map((uuid, i) => {
            if (i === this.selectedIndex) {
                return `<input hidden name="triggers${this.uuid}" id="trigger${uuid}" type="radio" checked="true">`
            }
            return `<input hidden name="triggers${this.uuid}" id="trigger${uuid}" type="radio">`
        })
        .forEach(radioTemplate => {
            let div = document.createElement("DIV");
            div.innerHTML = radioTemplate;
            this.wrapper.prepend(div.firstElementChild);
        });

    // Add the CSS engine
    let style = document.createElement("STYLE");
    style.innerHTML = this.getStyle();
    this.wrapper.prepend(style);
}

Tabby.prototype.onTabChange = function (fn) {
    this.listeners.push(fn);
};

Tabby.prototype.getStyle = function () {
    let showContentSelectors = this.uuids
        .map((uuid, i) => `#trigger${uuid}:checked ~ .tabby-contents #content${uuid}`)
        .join(", ");
    let labelActivationSelector = this.uuids
        .map((uuid, i) => `#trigger${uuid}:checked ~ .tabby-labels label[for="trigger${uuid}"]`)
        .join(", ");
    return `${showContentSelectors} {
    display: block !important;
  }
  
  ${labelActivationSelector} {
    color: ${this.activeTabColor};
    background-color: ${this.activeTabBG};
  }
  
  .separator${this.uuid} {
    margin-top: 0;
    height: 4px;
    background-color: ${this.activeTabBG};
  }
  
  .labels${this.uuid} {
    display: flex;
    border-radius: 1rem 1rem 0 0;
    color: ${this.tabsColor};
    background-color: ${this.tabsBG};
    overflow: auto;
  }
  
  .labels${this.uuid} .tabby-label {
    display: inline-block;
    padding: .5rem 1rem 0.25rem 1rem;
    border-radius: 1rem 1rem 0 0;
    white-space: nowrap;
  }
  
  .contents${this.uuid} {
    border-bottom: 4px solid ${this.activeTabBG};
  }
  
  .tabby-content {
    display: none;
  }`;
};
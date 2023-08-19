import {LinkElements,setImgFormInput} from "/shared/js/utils/thumbnailHandler.js";

function deleteButtonHanlder(AccountElement, socialMediaAccountTypeSelectingElement) {
    let AccountTypeText = AccountElement.querySelector("h4").innerText.toLowerCase();
    let Value = AccountElement.querySelector("input").getAttribute("accountid");
    let superElement = AccountElement.parentElement;
    superElement.removeChild(AccountElement);

    let optionElement = document.createElement("option");
    optionElement.value = Value;
    optionElement.innerText = AccountTypeText;
    optionElement.classList.add("Override");
    optionElement.setAttribute("AccountName",AccountTypeText);
    socialMediaAccountTypeSelectingElement.appendChild(optionElement);

}

function checkInputValidity(InputElement) {
    if (!InputElement.checkValidity() && InputElement.innerText == "") {
        let DefaultColor = InputElement.style.color;
        InputElement.value = "Add Valid Url";
        InputElement.style.color = "red";
        InputElement.readOnly = true;
        setTimeout(() => {
            InputElement.value = "";
            InputElement.style.color = DefaultColor;
            InputElement.readOnly = false;
        }, 1000);
        return false;
    }
    return true;

}

function createAccountElement(Heading, linkAddress, accountTypeSelectingElement,Value=0) {
    let AccountContainerElement = document.createElement("div");
    AccountContainerElement.classList.add("account");

    let HeadingElement = document.createElement("h4");
    HeadingElement.innerText = Heading;

    let InputElement = document.createElement("input");
    InputElement.type = "url";
    InputElement.name = Value;
    InputElement.readOnly = true;
    InputElement.setAttribute("value",linkAddress);
    InputElement.setAttribute("AccountId",Value);

    let DeleteButtonElement = document.createElement("button");
    DeleteButtonElement.innerText = "Delete";

    DeleteButtonElement.addEventListener("click",(event)=>{
        event.preventDefault();
        deleteButtonHanlder(AccountContainerElement,accountTypeSelectingElement);
    });


    AccountContainerElement.appendChild(HeadingElement);
    AccountContainerElement.appendChild(InputElement);
    AccountContainerElement.appendChild(DeleteButtonElement);

    return AccountContainerElement;

}

function AddButtonHandler(socialMediaAccountAddedContainerElement, socialMediaAccountTypeSelectingElement, socialMediaAccountUrlElement) {
    let selectElementSelectedIndex = socialMediaAccountTypeSelectingElement.selectedIndex;
    if (selectElementSelectedIndex == 0) return;
    if (!checkInputValidity(socialMediaAccountUrlElement)) return;

    let AccountTypeText = (socialMediaAccountTypeSelectingElement.options[socialMediaAccountTypeSelectingElement.selectedIndex]).getAttribute("AccountName");
    let Value = (socialMediaAccountTypeSelectingElement.options[socialMediaAccountTypeSelectingElement.selectedIndex]).value;
    socialMediaAccountTypeSelectingElement.options.remove(selectElementSelectedIndex);
    socialMediaAccountTypeSelectingElement.selectedIndex = 0;

    let UrlText = socialMediaAccountUrlElement.value;
    socialMediaAccountUrlElement.value = "";

    socialMediaAccountAddedContainerElement.appendChild(createAccountElement(AccountTypeText, UrlText, socialMediaAccountTypeSelectingElement,Value));

}

export function InitializeTheSocialMediaLinkAdder(socialMediaAccountTypeSelectingSelector = ".socialMediaContainer .accountAddingContainer .socialMediaAccountType", socialMediaAccountAddedContainerSelector = ".socialMediaContainer .addedAccountContainer", socialMediaAccountUrlSelector = ".socialMediaContainer .accountAddingContainer input", socialMediaAccountAddButtonSeletor = ".socialMediaContainer .accountAddingContainer button") {
    let addedAccountContainerElement = document.querySelector(socialMediaAccountAddedContainerSelector);
    let accountTypeSelectingElement = document.querySelector(socialMediaAccountTypeSelectingSelector);
    let socialMediaAccountUrlElement = document.querySelector(socialMediaAccountUrlSelector);
    let socialMediaAccountAddButtonElement = document.querySelector(socialMediaAccountAddButtonSeletor);


   socialMediaAccountAddButtonElement.addEventListener("click",(event)=>{
    event.preventDefault();
    AddButtonHandler(addedAccountContainerElement,accountTypeSelectingElement,socialMediaAccountUrlElement);
   });

   addedAccountContainerElement.addEventListener("click",(event)=>{
    event.preventDefault();
    if(event.target.tagName == "BUTTON"){
        deleteButtonHanlder(event.target.parentElement,accountTypeSelectingElement);
    }
   });
}

function deletButtonSetup(container){
    container.addEventListener("click",(event)=>{
        if(event.target.name == "DeleteButton"){
            event.target.addEventListener("click",(event)=>{
                event.preventDefault();
            });
            let subSuperElement = event.target.parentElement;
            let superElement = subSuperElement.parentElement;
            superElement.removeChild(subSuperElement);
        }
    });
}
function AddDropDownItem(container,name){
    let element = document.createElement("div");
    element.classList.add("container");

    let InputTag = document.createElement("input");
    InputTag.type = "text";
    InputTag.name = name;
    InputTag.placeholder = "Add "+name;

    let DeleteButton = document.createElement("button");
    DeleteButton.classList.add("Delete");
    DeleteButton.name = "DeleteButton";
    DeleteButton.innerText = "Delete";
    deletButtonSetup(container);

    element.appendChild(InputTag);
    element.appendChild(DeleteButton);

    container.appendChild(element);
}

function dropDownInitializer(ContainerElementSelector = ".DropDownContainer",AddButtonSelector=".DropDownContainer .DropDownContainerAddButton"){
    let ContainerElement = document.querySelector(ContainerElementSelector);
    let AddButtonElement = document.querySelector(AddButtonSelector);

    deletButtonSetup(ContainerElement);

    AddButtonElement.addEventListener("click",(event)=>{
        event.preventDefault();
        AddDropDownItem(ContainerElement,ContainerElement.getAttribute("name"));
    });

}
export function initDropDown(){
    dropDownInitializer(".DropDownContainer.first",".DropDownContainer.first .DropDownContainerAddButton");
    dropDownInitializer(".DropDownContainer.second",".DropDownContainer.second .DropDownContainerAddButton");
}

export function setTheProfile(profilePictureSeletor=".UserDetails .profilePicture img",profilePictureinputSelector=".UserDetails .profilePicture #ProfilePicture"){
    
    const profilePicture = document.querySelector(profilePictureSeletor);
    const profilePictureInput = document.querySelector(profilePictureinputSelector);
  
    LinkElements(profilePicture,profilePictureInput);
  
    profilePictureInput.addEventListener('change', function(event) {
        setImgFormInput(profilePicture,event.target);
    });

}


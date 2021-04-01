
window.onload = function(){
  document.addEventListener("keydown",Prevent_Line_Breaks);
  document.getElementById('Main_Container').addEventListener("mousedown",Check_If_Task_Name_Is_Empty);
  let Buttons = document.getElementsByTagName('button');
  let Tasks_Containers = document.getElementsByClassName('Tasks');
  for(Index = 0; Index < Buttons.length; Index++){
    Buttons[Index].addEventListener("click",Checkmark);
    Buttons[Index].addEventListener("click",Save_Checkmarked);
  }
}

function Prevent_Line_Breaks(e){
  if(e.key == "Enter" | e.key == "Escape"){
    Check_If_Task_Name_Is_Empty();
    document.activeElement.blur();
    e.preventDefault(); 
  }
}

function Check_If_Task_Name_Is_Empty(){
  let Task = document.activeElement;
  if(Task.className == "Task_Names"){
  let Task_Name = Task.value;  
  let Task_Number = String(Task.id).split("_")[1];
  if(!Task_Name){
    document.activeElement.value = "Task " + Task_Number;
  }
}
  Save_Data();
}

function Container_Clicked(){
  this.children[0].focus();
}

function Checkmark(){
  let Button = this;
  Button.classList.toggle('Rotate_Animation');
  let Button_Index = parseInt((Button.id).split("_")[1]);
  let Task_Container = document.getElementsByClassName('Tasks')[Button_Index-1];
  Task_Container.classList.toggle('Tasks_Completed_Swipe');
  let Checkmark_Buttons = document.getElementsByTagName('Button');
  
  let Element = document.activeElement.parentElement.parentElement.children[0];
  Element.blur();
  Button.classList.toggle('Completed');
  let Task_Label = Button.parentElement.parentElement.children[0];
  if(Button.children[0].style.color == "white"){
    Button.children[0].style.color = "rgba(255,255,255,0)";
    Task_Label.style.color = "rgba(0,0,0,0.3)";
    // Task_Label.style.fontWeight = "lighter";
    Checkmark_Buttons[Button_Index-1].dataset.state = "0";
  }else{
    Button.children[0].style.color = "white";
    Task_Label.style.color = "white";
    // Task_Label.style.fontWeight = "bold";
    Checkmark_Buttons[Button_Index-1].dataset.state = "1";
  }
    Check_If_All_Completed();
}

function Check_If_All_Completed(){
  let Checkmark_Buttons = document.getElementsByTagName('Button');
  var Count = 0;
  for(Index = 0; Index < Checkmark_Buttons.length; Index++){
    Count = Count + parseInt(Checkmark_Buttons[Index].dataset.state);
  }
  if(Count == 5){
    document.getElementById('Completed_Label').style.opacity = "1";
    let Completed_Modal = document.getElementById('Completed_Check_Mark');
    Completed_Modal.style.opacity = 1;
    Completed_Modal.style.transform = "rotateZ(360deg)";
    let Task_Containers = document.getElementsByClassName('Tasks');
    for(Index = 0; Index < Task_Containers.length; Index++){
      var Animation_Name = 'Slide_Right_' + String(5-Index);
      Task_Containers[Index].classList.add(Animation_Name);
    }    
  }
}








let Milliseconds_To_Midnight = 0;

function Reload_Data(Task_Names_Data,State_Data,Date_Data){
  document.getElementById('Completed_Label').style.opacity = "0";
  let Task_Labels = document.getElementsByClassName('Task_Names');
  let Checkmark_Buttons = document.getElementsByTagName('Button');
  var Full_Date = String(new Date()).split(" ").splice(1,3).toString();
  var Previous_Date = String(Date_Data).split(" ").splice(1,3).toString();
  if(Previous_Date != Full_Date){
    Refresh_State_Data();
  }
  
  for(Index = 0; Index < Task_Names_Data.length; Index++){
    Task_Labels[Index].value = String(Task_Names_Data[Index]);
    if(Previous_Date == Full_Date){
      if(parseInt(State_Data[Index]) == 1){
        Checkmark_Buttons[Index].classList.toggle('Completed');
        Checkmark_Buttons[Index].children[0].style.color = "white";
        Checkmark_Buttons[Index].parentElement.parentElement.children[0].style.color = "white";
        Checkmark_Buttons[Index].dataset.state = "1";
        Checkmark_Buttons[Index].parentElement.parentElement.classList.toggle('Tasks_Completed_Swipe');
      } 
    }
  }
  
  let Sum =  State_Data.reduce((a, b) => a + b, 0);
  let Time_Buffer = 200;
  if(Sum == 5){
    setTimeout(() => {Check_If_All_Completed();},Time_Buffer);
  }
  Update_Date();
}

function Save_Data(){
  let Task_Labels = document.getElementsByClassName('Task_Names');
  let Task_Names = new Array(5);
  for(Index = 0; Index < Task_Labels.length; Index++){
    Task_Names[Index] = String(Task_Labels[Index].value);
  }
  Task_Names_Data_Stream = JSON.stringify(Task_Names,null,2); 
  Save_JSON_Data(Task_Names_Data_Stream);
}

function Save_Checkmarked(){
  let Checkmark_Buttons = document.getElementsByTagName('Button');
  let State_Array = new Array(5);
  for(Index = 0; Index < State_Array.length; Index++){
    State_Array[Index] = parseInt(Checkmark_Buttons[Index].dataset.state);
  }
  State_Data_Stream = JSON.stringify(State_Array,null,2); 
  Save_State(State_Data_Stream);
}

function Update_Date(){
  var Full_Date = String(new Date());
  Full_Date_Stream = JSON.stringify(Full_Date,null,2); 
  Save_Date(Full_Date_Stream);
}

function Start_Active_Reset(){
  let Time = new Date();
  let Time_Descriptor = String(Time.getHours()) + ":" + String(Time.getMinutes()) + ":" + String(Time.getSeconds());
  let Hours = Time.getHours();
  let Minutes = Time.getMinutes();
  let Seconds = Time.getSeconds();
  let Seconds_In_Minutes = Seconds/60;
  Minutes = Minutes + Seconds_In_Minutes;
  let Minutes_In_Hours = Minutes/60;
  Hours = Hours + Minutes_In_Hours; 
  let Midnight = 24;
  let Hours_To_Midnight = Midnight - Hours;
  Milliseconds_To_Midnight = parseFloat(Hours_To_Midnight*3600*1000);
  let Tester_Time = 2000;
  setTimeout(()=>{
    Refresh_State_Data();
  }, Milliseconds_To_Midnight);
}

function Refresh_GUI_Checkmarks(){
  document.getElementById('Completed_Label').style.opacity = "0";
  console.log("Refresh GUI");
  console.log(Milliseconds_To_Midnight);
  let Checkmark_Buttons = document.getElementsByTagName('Button');
  console.log(Checkmark_Buttons);
  for(Index = 0; Index < Checkmark_Buttons.length; Index++){
    if(Checkmark_Buttons[Index].classList.contains('Completed')){
      Checkmark_Buttons[Index].classList.toggle('Completed');
      Checkmark_Buttons[Index].children[0].style.color = "rgba(0,0,0,0)";
      Checkmark_Buttons[Index].parentElement.parentElement.children[0].style.color = "rgba(0,0,0,0.3)";
      Checkmark_Buttons[Index].dataset.state = "0";
      Checkmark_Buttons[Index].parentElement.parentElement.classList.toggle('Tasks_Completed_Swipe');
    }  
  }
  Milliseconds_To_Midnight = parseFloat(24*3600*1000);
  console.log(Milliseconds_To_Midnight);

}






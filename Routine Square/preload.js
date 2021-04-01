const {remote} = require('electron');
fs = require('fs');

var Path_Prefix = "";
var Saving = false;

window.addEventListener('DOMContentLoaded', () => {
  const {app} = require('electron').remote;
  Path_Prefix = app.getAppPath();
  Path_Prefix = Path_Prefix.replace("Resources/app.asar","") + "Task_Data/";
  // console.log(Path_Prefix);
  
  let Task_Names_Data_Stream = fs.readFileSync(Path_Prefix+'Save_Data.json');
  let Task_Names_Data = JSON.parse(Task_Names_Data_Stream);
  let State_Data_Stream = fs.readFileSync(Path_Prefix+'Save_State.json');
  let State_Data = JSON.parse(State_Data_Stream);
  let Date_Stream = fs.readFileSync(Path_Prefix+'Date.json');
  let Date_Data = JSON.parse(Date_Stream);
  Reload_Data(Task_Names_Data,State_Data,Date_Data);
  
  Start_Active_Reset();  

})

Save_JSON_Data = function(JSON_Data){
  Saving = true;
  fs.writeFile(Path_Prefix+'Save_Data.json',Task_Names_Data_Stream,Toggle_Saving);
}

Save_State = function(State_Data_Stream){
  Saving = true;
  fs.writeFile(Path_Prefix+'Save_State.json',State_Data_Stream,Toggle_Saving);
}

Save_Date = function(Full_Date_Stream){
  Saving = true;
  fs.writeFile(Path_Prefix+'Date.json',Full_Date_Stream,Toggle_Saving);
}

Refresh_State_Data = function(){
  Saving = true;
  let State_Data =[0,0,0,0,0];
  State_Data_Data_Stream = JSON.stringify(State_Data,null,2); 
  fs.writeFile(Path_Prefix+'Save_State.json',State_Data_Data_Stream,Toggle_Saving);
  Refresh_GUI_Checkmarks();
}

function Toggle_Saving(){
  Saving = false;
}


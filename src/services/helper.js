/*

JS Functions Helper
1. truncateString(string) - Truncate string if too long
3. stripTitle() - [0]Artist, [1]Title
*/


export function truncateString(string, value = 20){
  if(!string){
     return undefined
  } else if (string.length > value){
   return string.substring(0,value-1)+'...';
  } else if (string.length < value){
   return string;
  } 
};

export function stripTitle(string){
   if(!string){
      return undefined
   } else {
   var temp = string.split(' - ')
   var artist = temp.shift()
   var title = temp.join(' - ')
   }
   return [artist,title]
}

export function getFormattedDate() {
   var date = new Date();
   var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

   return str;
}
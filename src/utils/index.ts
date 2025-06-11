  import { formatDistanceToNow, parseISO } from 'date-fns';
  export const formatRelativeTime = (isoDate:string)=>{
 const date = parseISO(isoDate)
 const secondsAgo = (Date.now()-date.getTime())/1000
 if (secondsAgo < 60) return "Just now";
 if (secondsAgo < 120) return "A minute ago";
 if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} minutes ago`;
 if (secondsAgo < 7200) return "An hour ago";
 if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hours ago`;
return formatDistanceToNow(date,{addSuffix:true})
  }
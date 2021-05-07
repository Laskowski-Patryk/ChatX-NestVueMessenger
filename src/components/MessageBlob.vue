<template>
    <div id = "blob">
        <div class="clickable" id = "avatar">
            <img src="../assets/images/simple-avatar.png">
        </div>
        <div class="clickable" id = "conversation">
            <div id ="name"> </div>
        </div>
    </div>
</template>



<script>
export default {
    
}
</script>




<style>
#name{
    
    margin-top: 10px;
}
#avatar{
    width:80px;
    height:80px;
    margin-left: 4%;
    border-radius: 50%;
    background: #e0e0e0;
    box-shadow:  10px 10px 20px #bababa,
             -10px -10px 20px #ffffff;
    float:left;

}


#conversation{

    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    color: black;
    width:85%;
    height:80px;
    margin-left:8%;
    margin-top:40px;
    border-radius: 10px;
    background: #e0e0e0;
    box-shadow: 10px 10px 20px #bababa,
               -10px -10px 20px #ffffff;
}
#avatar>img{
    width:70%;
    height:70%;

    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
     -moz-user-drag: none;
    -o-user-drag: none;
   -webkit-user-drag: none;
}
#blob{
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge*/
   user-select: nonea;          /* Non-prefixed version, currently 
                                  not supported by any browser */
}

</style>
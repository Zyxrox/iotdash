//----------------------- forEach
function showData(uid){
    var firebaseRef = firebase.database().ref("User/"+uid+"");
    firebaseRef.once('value').then(function(dataSnapshot) {
      dataSnapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log("test = ",childData);
      });
    });
  }
  //---------------------- ONCE
  function Parking(){
      var ref = firebase.database().ref("Ultra");
      ref.once("value").then(function(snapshot) {
        var number = snapshot.child("Number").val();
        var Confirm = snapshot.child("Confirm").val();
        var status = snapshot.child("status").val();

      });
    }
    //-------------------- ON
    function Parker(){
      var database = firebase.database().ref("Ultra");
      var confirm,status ='';
      database.on('value',snap =>{
        status = snap.child("status").val();
        confirm = snap.child("Confirm").val();
        // if (status==1||confirm==1) {
        //   $('#no2').attr("src", "no_parking.png");
        // }
        // else {
        //   $('#texts').html("จองที่จอดหมายเลข "+sessionStorage.number+" ใช่หรือไม่?");
        //   var link = document.createElement('a');
        //   link.onclick = "Rent()";
        //   $('#no2').attr("src", "parking.png");
        //
        //   $('#no2_a').attr("data-toggle", "modal");
        //   $('#no2_a').attr("data-target", "#exampleModal");
        // }
        // $('#test').html("จองที่จอดหมายเลข "+status);
      });

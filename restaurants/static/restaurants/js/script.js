(function(){
 
    var tour = new Tour({
        storage : false,
        name: "dashtour",
        backdrop: true,      //aquando do tour poe o fundo preto
    });
 
    tour.addSteps([
      {
        element: ".tour-step.tour-step-one",
        placement: "bottom",
        title: "Welcome to our landing page!",
        content: "This tour will guide you through some of the features we'd like to point out."
      },
      {
        element: ".tour-step.tour-step-two",
        placement: "bottom",
        title: "Main navigation",
        content: "Here are the sections of this page, easily laid out."
      },
      {
        element: ".tour-step.tour-step-three",
        placement: "top",
        backdrop: true,
        title: "Main section",
        content: "This is a section that you can read. It has valuable information."
      },
 
    ]);
 
    // Initialize the tour
    tour.init();
 
    // Start the tour
    tour.start();
 
}());
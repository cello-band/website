document.addEventListener('DOMContentLoaded', function () {
    // define all UI variable
    const navToggler = document.querySelector('.nav-toggler');
    const navMenu = document.querySelector('.site-navbar ul');
    const navLinks = document.querySelectorAll('.site-navbar a');

// load all event listners
    allEventListners();


// functions of all event listners
    function allEventListners() {
        // toggler icon click event
        navToggler.addEventListener('click', togglerClick);
        // nav links click event
        navLinks.forEach(elem => elem.addEventListener('click', navLinkClick));

    }

// togglerClick function
    function togglerClick() {
        navToggler.classList.toggle('toggler-open');
        navMenu.classList.toggle('open');
    }

// navLinkClick function
    function navLinkClick() {
        if (navMenu.classList.contains('open')) {
            navToggler.click();
        }
    }


    const pageData = {
        "news": [
            {
                "date": "01.01.2024",
                "icon": "bi-calendar-check",
                "title": "Test 1",
                "description": "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. "
            },
            {
                "date": "01.01.2024",
                "icon": "bi-info-circle",
                "title": "Ne Info",
                "description": "Blablablablabla sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. "
            }
        ]
    }


    for (var key in pageData) {
        for (var i = 0; i < pageData[key].length; i++) {
          var date = pageData[key][i].date;
          var icon = pageData[key][i].icon;
          var title = pageData[key][i].title;
          var desc = pageData[key][i].description;


          var newsCard = document.createElement('div');
          newsCard.className = 'card mb-2';
          newsCard.innerHTML =
              '<div class="row no-gutters">' +
              '<div class="col-sm-1 position-relative">' +
              '<i class="bi news-icon position-absolute ' + icon + '"></i>' +
              // '<img class="card-img" src="/images/defaultimg.png" alt="Suresh Dasari Card">' +
              '</div>' +
              '<div class="col-sm-11">' +
              '<div class="card-body">' +
              '<h5 class="card-title">' + date + ' | ' + title + '</h5>' +
              '<p class="card-text text-truncate" style="max-height: 50px;">' + desc + '</p>' +
              ' <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#' + "newsmodal" + i + '">' +
              // ' <button type="button" class="btn btn-primary" onclick="openNewsModal(' + "newsmodal" + i + ')">' +
              'Mehr' +
              '</button>' +
              '</div>' +
              '</div>' +
              '</div>';
          console.log(key)
          document.getElementById("news-container").appendChild(newsCard);


          var newsModal = document.createElement('div');
          newsModal.className = 'modal fade';
          newsModal.setAttribute("id", "newsmodal" + i);
          newsModal.setAttribute("tabIndex", "-1");
          newsModal.setAttribute("role", "dialog");
          newsModal.setAttribute("aria-labelledby", "newsmodal" + i);
          newsModal.setAttribute("aria-hidden", "true");
          newsModal.innerHTML =
                '<div className="modal-dialog" role="document">' +
                  '<div className="modal-content">' +
                    '<div className="modal-header">' +
                      '<h5 className="modal-title" id="exampleModalLabel">Modal title</h5>' +
                      '<button type="button" className="close" data-dismiss="modal" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span>' +
                      '</button>' +
                   ' </div>' +
                    '<div className="modal-body">' +
                      '...' +
                    '</div>' +
                  '</div>' +
                '</div>';
          console.log(key)
          document.getElementById("modal-insert-container").appendChild(newsModal);
        }
    }
}, false);


function openNewsModal(data) {

  var selector = "#newsmodal" + data;
  console.log(selector)
  $(selector).modal('show')
  // $(selector).modal('show')

}





function prepareDescription(desc) {
   let regex = /L10N House/gmi;
   return desc.replaceAll(regex , `<span class="fw-medium"><span class="firstColor">L10N</span> <span class="secondColor">House</span></span>`)
  }

function openPopup(popupName){
    $('body').css('overflow' , 'hidden');
    $(`.popup[data-popup-name='${popupName}']`).fadeIn(1000 , function(){
        if(popupName == 'languages'){
            $(`.popup[data-popup-name='${popupName}']`).find('.box').addClass('show');
            popupLanguages = 'languages';
        }
    });
    document.body.classList.add("popup-open");
}

function closePopup(){
    $(`.popup`).fadeOut(1000 , function(){
        $('body').css('overflow' , 'auto');
    })
    if(popupLanguages == 'languages'){
        $(`.popup`).find(".box").removeClass("show");
        $(`.popup`).delay(500).fadeOut(1000);
    }
    document.body.classList.remove("popup-open");
}

function prepareSectionOfService(sections){
    let sectionsEle = ``;

    let i = 0;

    for(let section of sections){
        sectionsEle += `
            <section class='${(i != 0) ? "mt-3" : ""}'>
                <h5>${section.title}</h5>
                <ol>
                   ${console.log(preparePoints(section.points))}
                   ${preparePoints(section.points)}
                </ol>
            </section>
        `
        i++;
    }
    return sectionsEle;
}

function preparePoints(points){
    let lis = ``;

    for(let point of points){
        lis += `<li class='mb-1'>${point}</li>`
    }

    return lis;
}

function showService(serviceIndex){
    let service = services[serviceIndex];

    $(`.popup[data-popup-name='service'] .box .body`).html(`
                <h2 class="mb-lg-5 mb-4 secondColor text-center">${service.title}</h2>
                <div class="row mb-5">
                    <div class="col-lg-6">
                        <div class="item">
                            <p>${prepareDescription(service.description)}</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="item">
                            <img src="images/${service.img}" class="img-fluid rounded-3" alt="popup service image">
                        </div>
                    </div>
                </div>
               
                ${prepareSectionOfService(service.sections)}
        `);


    openPopup('service');
}

function prepareLanguages(languages){
    let lis = ``;

    for(let language of languages){
        lis += `<li class='mb-1'><i class="fa-regular fa-circle-dot me-1"></i> ${language}</li>`
    }

    return lis;
}
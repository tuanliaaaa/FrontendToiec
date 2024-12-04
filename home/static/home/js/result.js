import { getAjax, postAjax, patchAjax, deleteAjax } from '/static/home/js/lib/UtilJsonAjax.js';
import { renderTemplate } from '/static/home/js/component/question.js';
import { checkAccount } from '/static/home/js/middleware/auth.js';

await checkAccount();  
const buttonMenus = document.getElementsByClassName('menu-list__item');
const resultContentTabs = document.getElementsByClassName('result__list-question');

Array.from(buttonMenus).forEach(buttonMenu => {
    buttonMenu.addEventListener("click", function () {
        Array.from(buttonMenus).forEach(btn => btn.classList.remove('menu-list__item--active'));
        Array.from(resultContentTabs).forEach(tab => tab.style.display = "none");
        if (document.getElementsByClassName(this.getAttribute('data-type')).length) {
            document.getElementsByClassName(this.getAttribute('data-type'))[0].style.display = "block";
        }
        this.classList.add('menu-list__item--active');
    });
});

function renderQuestion(idQuestion,part,idAnswerCorrect,idAnswerUserSelected){
    if(part=="part1"){

    }else if(par=="part2"){

    }else if(par=="part3"){

    }else if(par=="part4"){

    }
    else if(par=="part5"){

    }else if(par=="part6"){

    }else{

    }

}


function renderHistoryOfUser(idHistory)
{

}
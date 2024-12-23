from django.urls import path
from .views import (
    Login,Home,Vocabulary,VocabularyDetail,RoadMap,RoadMapDeatail,RoadMapLessonDeatail,
    ChatSupport,ExamDetail,ExamResult,Exams,Histories,Result,Test,
    StudyBySection,
    Setting
)

urlpatterns = [
    path('login', Login.as_view()),
    path('home',Home.as_view()),
    path('vocabulary',Vocabulary.as_view()),
    path('vocabulary/<int:id>',VocabularyDetail.as_view()),
    path('roadmap',RoadMap.as_view()),
    path('roadmap/<int:id>',RoadMapDeatail.as_view()),
    path('roadmapdetail/<int:id>',RoadMapLessonDeatail.as_view()),
    path('chatsupport',ChatSupport.as_view()),
    path('exam/<int:id>',ExamDetail.as_view()),
    path('exams',Exams.as_view()),
    path('success-exam',ExamResult.as_view()),
    path('histories/<int:id>',Histories.as_view()),
    path('result',Result.as_view()),
    path("test",Test.as_view()),
    path("setting",Setting.as_view()),
    path('studybysection/<str:section>',StudyBySection.as_view())
]
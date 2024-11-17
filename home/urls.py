from django.urls import path
from .views import Login,Home,Question,QuestionDetail,Vocabulary,VocabularyDetail,RoadMap,RoadMapDeatail,RoadMapLessonDeatail
urlpatterns = [
    path('login', Login.as_view()),
    path('home',Home.as_view()),
    path('question/question',QuestionDetail.as_view()),
    path('question/<str:id>',Question.as_view()),
    path('vocabulary',Vocabulary.as_view()),
    path('vocabulary/<int:id>',VocabularyDetail.as_view()),
    path('roadmap',RoadMap.as_view()),
    path('roadmap/<int:id>',RoadMapDeatail.as_view()),
    path('roadmapdetail/<int:id>',RoadMapLessonDeatail.as_view()),
     
]

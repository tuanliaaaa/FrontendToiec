from django.urls import path
from .views import (
    Vocabulary,VocabularyDetail,Login,Exams,ExamDetail,Dashboard,VocabularyAdd,
    LearningPath,LearningPathDetail,LearningPathAdd,
    
)
from .view.grammarViews import(
    Lesson,LessonDetail,LessonAdd
)
from .view.questionGroupViews import(
    QuestionGroupList,QuestionGroupDetail,QuestionGroupAdd
)
urlpatterns = [
    path('vocabulary',Vocabulary.as_view()),
    path('vocabulary/add',VocabularyAdd.as_view()),
    path('learningpath',LearningPath.as_view()),
    path('learningpath/add',LearningPathAdd.as_view()),
    path('learningpath/<int:idLearningPath>',LearningPathDetail.as_view()),
    path('exams',Exams.as_view()),
    path('exams/<int:id>/<str:part>',ExamDetail.as_view()),
    path('vocabulary/word/<int:id>',VocabularyDetail.as_view()),
    path('login/',Login.as_view()),   
]
urlpatterns+=[
    path('lesson',Lesson.as_view()),
    path('lessons/add',LessonAdd.as_view()),
    path('lessons/<int:id>',LessonDetail.as_view()),
]
urlpatterns+=[
    path('questiongroups',QuestionGroupList.as_view()),
    path('questiongroupsadd',QuestionGroupAdd.as_view()),
    path('questiongroups/<int:id>',QuestionGroupDetail.as_view()),
    
]
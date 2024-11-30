from django.urls import path
from .views import (
    Vocabulary,VocabularyDetail,Login,Exams,ExamDetail,Dashboard,VocabularyAdd,LearningPath,LearningPathDetail,
    Lesson,LessonDetail
)
urlpatterns = [
    path('vocabulary',Vocabulary.as_view()),
    path('vocabulary/add',VocabularyAdd.as_view()),
    path('learningpath',LearningPath.as_view()),
    path('learningpath/<int:idLearningPath>',LearningPathDetail.as_view()),
    path('dashboard',Dashboard.as_view()),
    path('exams',Exams.as_view()),
    path('exams/<int:id>',ExamDetail.as_view()),
    path('vocabulary/word/<int:id>',VocabularyDetail.as_view()),
    path('login/',Login.as_view()),
    path('lesson',Lesson.as_view()),
    path('lessondetail/<int:id>',LessonDetail.as_view()),
    
    
]

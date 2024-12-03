from django.shortcuts import render
from django.views import View
from toiec.settings import domainBackend

class Vocabulary(View):
    def get(self,request):
        return render(request,'admin/vocabulary.html')
class VocabularyDetail(View):
    def get(self,request,id):
        return render(request,'admin/vocabulary-detail.html')
class Login(View):
    def get(self,request):
        return render(request,'admin/login.html')

class Exams(View):
    def get(self,request):
        return render(request,'admin/exam.html')
class ExamDetail(View):
    def get(self,request,id,part):
        return render(request,"admin/exam-detail/"+part+".html")
class Dashboard(View):
    def get(self,request):
        return render(request,'admin/dashboard.html')
class VocabularyAdd(View):
    def get(self,request):
        return render(request,'admin/vocabulary-add.html')
class LearningPath(View):
    def get(self,request):
        return render(request,'admin/learning-path/learning-path.html')
class LearningPathDetail(View):
    def get(self,request,idLearningPath):
        return render(request,'admin/learning-path/learning-path-detail.html')

class LearningPathAdd(View):
    def get(self,request):
        return render(request,"admin/learning-path/learning-path-add.html")
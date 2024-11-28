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
class RoadMap(View):
    def get(self,request):
        return render(request,'admin/roadmap.html')
class Exams(View):
    def get(self,request):
        return render(request,'admin/exam.html')
class ExamDetail(View):
    def get(self,request,id):
        return render(request,'admin/exam-detail.html')
class Dashboard(View):
    def get(self,request):
        return render(request,'admin/dashboard.html')
class VocabularyAdd(View):
    def get(self,request):
        return render(request,'admin/vocabulary-add.html')
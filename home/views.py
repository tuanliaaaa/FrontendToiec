from django.shortcuts import render
from django.views import View
from toiec.settings import domainBackend
# Create your views here.
class Login(View):
    def get(self,request):
        return render(request,'home/login.html')
class Home(View):
    def get(self,request):
        return render(request,'home/home.html')
class QuestionDetail(View):
    def get(self,request):
        return render(request,'home/question.html')
class Question(View):
    def get(self,request,id):
        return render(request,'home/part'+id+".html")
class Vocabulary(View):
    def get(self,request):
        return render(request,"home/vocabulary.html")
class VocabularyDetail(View):
    def get(self,request,id):
        return render(request,'home/vocabulary-detail.html')
class RoadMap(View):
      def get(self,request):
        return render(request,"home/roadmap.html")
class RoadMapDeatail(View):
    def get(self,request,id):
        return render(request,'home/roadmap-detail.html')
class RoadMapLessonDeatail(View):
    def get(self,request,id):
        return render(request,'home/lessDetail.html')
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
class ChatSupport(View):
    def get(self,request):
        return render(request,'home/chatSupport.html')
class Exam(View):
    def get(self,request):
        return render(request,'home/exam.html')
class Exams(View):
     def get(self,request):
        return render(request,'home/exams.html')
class ExamResult(View):
    def get(self,request):
        return render(request,'home/success-exam.html')
class Histories(View):
    def get(self,request,id):
        return render(request,'home/result.html')
class Result(View):
    def get(self,request):
        return render(request,'home/result.html')
class Test(View):
    def get(self,request):
        return render(request,'home/topic-exam.html')
class StudyBySection(View):
    def get(self,request,section):
        return render(request,'home/studyBySection/'+section+'.html')
class Setting(View):
    def get(self,request):
        return render(request,'home/setting.html')
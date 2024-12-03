from django.shortcuts import render
from django.views import View
class Lesson(View):
    def get(self,request):
        return render(request,'admin/grammar/lessons.html')
class LessonDetail(View):
    def get(self,request,id):
        return render(request,'admin/grammar/lesson-detail.html')  
class LessonAdd(View):
    def get(self,request):
        return render(request,'admin/grammar/lesson-add.html')  
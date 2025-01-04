from django.shortcuts import render
from django.views import View
class QuestionGroupList(View):
    def get(self,request):
        return render(request,'admin/questiongroup/question-group-list.html')
class QuestionGroupDetail(View):
    def get(self,request,id):
        return render(request,'admin/questiongroup/question-group-detail.html')
class QuestionGroupAdd(View):
    def get(self,request):
        return render(request,'admin/questiongroup/question-group-add.html')
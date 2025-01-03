from django.shortcuts import render
from django.views import View
class QuestionGroupList(View):
    def get(self,request):
        return render(request,'admin/questiongroup/question-group-list.html')

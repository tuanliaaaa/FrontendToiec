from django.shortcuts import render
from django.views import View
from toiec.settings import domainBackend

class Vocabulary(View):
    def get(self,request):
        return render(request,'admin/vocabulary.html')
class VocabularyDetail(View):
    def get(self,request,id):
        return render(request,'admin/vocabulary-detail.html')
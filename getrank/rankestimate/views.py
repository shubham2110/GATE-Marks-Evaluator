from django.http.response import Http404
from django.shortcuts import render
from rest_framework.views import APIView

import rankestimate
from .models import *
from .serializers import *
from rest_framework.response import Response

#re.findall(r'\(\d,[+-]?[0-9]*\.?[0-9]+\)', f)

class EstimateRank(APIView):
    def get(self, request, format=None):
        params=request.query_params
        low_rank=0
        high_rank=10
        if not ("branch" in params and 'set' in params and 'marks' in params):
            response=Response()
            response.data={
                "error" : "Please enquiry about rank estimation with branch, set and marks.",
                "usage:" : "wget "+request.build_absolute_uri('?')+"?branch=CS&set=1&marks=40"
            }
            return response
        branch=params['branch']
        set=params['set']
        marks=params['marks']

        response=Response()
        response.data = {
            "lower_rank": low_rank,
            "higher_rank" : high_rank
        }
        return response


class MarksAPIView(APIView):
    # READ a single Todo
    def get_object(self, pk):
        try:
            return Marks.objects.get(pk=pk)
        except Marks.DoesNotExist:
            raise Http404

    def get(self, request, pk=None, format=None):
        if pk:
            data = self.get_object(pk)
            serializer = MarksSerializer(data)

        else:
            data = Marks.objects.all()
            serializer = MarksSerializer(data, many=True)

            return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data
        l=Domains.objects.filter(check = True).values('validdomain')
        valid_domains=map(lambda d: d['validdomain'] , l)
        if("sheeturl" in data) and valid_domains:
            flag=False
            from urllib import parse
            a=parse.urlsplit(data['sheeturl']).netloc
            for each in valid_domains:
                if a[-1 * len(each): ] == each:
                    flag=True
            if not flag==True:
                print("Following url is being rejected because of domain mismatch: ", data['sheeturl'] )
                del data['sheeturl']
        serializer = MarksSerializer(data=data)
        serializer.is_valid(raise_exception=True)    
        serializer.save()
        response = Response()
        response.data = {
            'message': 'Sheet added for analytics successfully. ',
            'data': serializer.data
        }

        return response
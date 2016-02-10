function stackBlurImage(t,a,e,r){var n=img.naturalWidth,g=img.naturalHeight,l=document.getElementById(a);l.style.width=n+"px",l.style.height=g+"px",l.width=n,l.height=g;var o=l.getContext("2d");o.clearRect(0,0,n,g),o.drawImage(img,0,0),isNaN(e)||1>e||(r?stackBlurCanvasRGBA(a,0,0,n,g,e):stackBlurCanvasRGB(a,0,0,n,g,e))}function stackBlurCanvasRGBA(t,a,e,r,n,g){if(!(isNaN(g)||1>g)){g|=0;var l,o=document.getElementById(t),i=o.getContext("2d");try{try{l=i.getImageData(a,e,r,n)}catch(c){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead"),l=i.getImageData(a,e,r,n)}catch(c){throw alert("Cannot access local image"),new Error("unable to access local image data: "+c)}}}catch(c){throw alert("Cannot access image"),new Error("unable to access image data: "+c)}var s,u,b,x,f,h,m,v,d,B,w,k,y,C,I,N,R,_,S,E,G,p,D,A,P=l.data,H=g+g+1,M=r-1,U=n-1,W=g+1,j=W*(W+1)/2,q=new BlurStack,z=q;for(b=1;H>b;b++)if(z=z.next=new BlurStack,b==W)var F=z;z.next=q;var J=null,K=null;m=h=0;var L=mul_table[g],O=shg_table[g];for(u=0;n>u;u++){for(N=R=_=S=v=d=B=w=0,k=W*(E=P[h]),y=W*(G=P[h+1]),C=W*(p=P[h+2]),I=W*(D=P[h+3]),v+=j*E,d+=j*G,B+=j*p,w+=j*D,z=q,b=0;W>b;b++)z.r=E,z.g=G,z.b=p,z.a=D,z=z.next;for(b=1;W>b;b++)x=h+((b>M?M:b)<<2),v+=(z.r=E=P[x])*(A=W-b),d+=(z.g=G=P[x+1])*A,B+=(z.b=p=P[x+2])*A,w+=(z.a=D=P[x+3])*A,N+=E,R+=G,_+=p,S+=D,z=z.next;for(J=q,K=F,s=0;r>s;s++)P[h+3]=D=w*L>>O,0!=D?(D=255/D,P[h]=(v*L>>O)*D,P[h+1]=(d*L>>O)*D,P[h+2]=(B*L>>O)*D):P[h]=P[h+1]=P[h+2]=0,v-=k,d-=y,B-=C,w-=I,k-=J.r,y-=J.g,C-=J.b,I-=J.a,x=m+((x=s+g+1)<M?x:M)<<2,N+=J.r=P[x],R+=J.g=P[x+1],_+=J.b=P[x+2],S+=J.a=P[x+3],v+=N,d+=R,B+=_,w+=S,J=J.next,k+=E=K.r,y+=G=K.g,C+=p=K.b,I+=D=K.a,N-=E,R-=G,_-=p,S-=D,K=K.next,h+=4;m+=r}for(s=0;r>s;s++){for(R=_=S=N=d=B=w=v=0,h=s<<2,k=W*(E=P[h]),y=W*(G=P[h+1]),C=W*(p=P[h+2]),I=W*(D=P[h+3]),v+=j*E,d+=j*G,B+=j*p,w+=j*D,z=q,b=0;W>b;b++)z.r=E,z.g=G,z.b=p,z.a=D,z=z.next;for(f=r,b=1;g>=b;b++)h=f+s<<2,v+=(z.r=E=P[h])*(A=W-b),d+=(z.g=G=P[h+1])*A,B+=(z.b=p=P[h+2])*A,w+=(z.a=D=P[h+3])*A,N+=E,R+=G,_+=p,S+=D,z=z.next,U>b&&(f+=r);for(h=s,J=q,K=F,u=0;n>u;u++)x=h<<2,P[x+3]=D=w*L>>O,D>0?(D=255/D,P[x]=(v*L>>O)*D,P[x+1]=(d*L>>O)*D,P[x+2]=(B*L>>O)*D):P[x]=P[x+1]=P[x+2]=0,v-=k,d-=y,B-=C,w-=I,k-=J.r,y-=J.g,C-=J.b,I-=J.a,x=s+((x=u+W)<U?x:U)*r<<2,v+=N+=J.r=P[x],d+=R+=J.g=P[x+1],B+=_+=J.b=P[x+2],w+=S+=J.a=P[x+3],J=J.next,k+=E=K.r,y+=G=K.g,C+=p=K.b,I+=D=K.a,N-=E,R-=G,_-=p,S-=D,K=K.next,h+=r}return{id:l,tx:a,ty:e}}}function stackBlurCanvasRGB(t,a,e,r,n,g){if(!(isNaN(g)||1>g)){g|=0;var l,o,i,c,s,u,b,x,f,h,m,v,d,B,w,k,y,C,I,N,R=t.getContext("2d"),_=R.getImageData(a,e,r,n),S=_.data,E=g+g+1,G=r-1,p=n-1,D=g+1,A=D*(D+1)/2,P=new BlurStack,H=P;for(i=1;E>i;i++)if(H=H.next=new BlurStack,i==D)var M=H;H.next=P;var U=null,W=null;b=u=0;var j=mul_table[g],q=shg_table[g];for(o=0;n>o;o++){for(B=w=k=x=f=h=0,m=D*(y=S[u]),v=D*(C=S[u+1]),d=D*(I=S[u+2]),x+=A*y,f+=A*C,h+=A*I,H=P,i=0;D>i;i++)H.r=y,H.g=C,H.b=I,H=H.next;for(i=1;D>i;i++)c=u+((i>G?G:i)<<2),x+=(H.r=y=S[c])*(N=D-i),f+=(H.g=C=S[c+1])*N,h+=(H.b=I=S[c+2])*N,B+=y,w+=C,k+=I,H=H.next;for(U=P,W=M,l=0;r>l;l++)S[u]=x*j>>q,S[u+1]=f*j>>q,S[u+2]=h*j>>q,x-=m,f-=v,h-=d,m-=U.r,v-=U.g,d-=U.b,c=b+((c=l+g+1)<G?c:G)<<2,B+=U.r=S[c],w+=U.g=S[c+1],k+=U.b=S[c+2],x+=B,f+=w,h+=k,U=U.next,m+=y=W.r,v+=C=W.g,d+=I=W.b,B-=y,w-=C,k-=I,W=W.next,u+=4;b+=r}for(l=0;r>l;l++){for(w=k=B=f=h=x=0,u=l<<2,m=D*(y=S[u]),v=D*(C=S[u+1]),d=D*(I=S[u+2]),x+=A*y,f+=A*C,h+=A*I,H=P,i=0;D>i;i++)H.r=y,H.g=C,H.b=I,H=H.next;for(s=r,i=1;g>=i;i++)u=s+l<<2,x+=(H.r=y=S[u])*(N=D-i),f+=(H.g=C=S[u+1])*N,h+=(H.b=I=S[u+2])*N,B+=y,w+=C,k+=I,H=H.next,p>i&&(s+=r);for(u=l,U=P,W=M,o=0;n>o;o++)c=u<<2,S[c]=x*j>>q,S[c+1]=f*j>>q,S[c+2]=h*j>>q,x-=m,f-=v,h-=d,m-=U.r,v-=U.g,d-=U.b,c=l+((c=o+D)<p?c:p)*r<<2,x+=B+=U.r=S[c],f+=w+=U.g=S[c+1],h+=k+=U.b=S[c+2],U=U.next,m+=y=W.r,v+=C=W.g,d+=I=W.b,B-=y,w-=C,k-=I,W=W.next,u+=r}return{id:_}}}function BlurStack(){this.r=0,this.g=0,this.b=0,this.a=0,this.next=null}var mul_table=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259],shg_table=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];
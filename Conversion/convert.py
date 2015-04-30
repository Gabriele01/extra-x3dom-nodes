#!/usr/bin/env python 

from xml.dom import minidom
from xml.dom.minidom import Document
import sys, os 

if  len(sys.argv) < 2 : 
    print("missing input file")
    exit()

# checking the file extension 
inputFile = os.path.basename(sys.argv[1])
extension = inputFile.split(".")[-1]

if extension != "x3d" and extension != "X3D" :
    print("input file extension is wrong")
    exit()

def printOutput(output) : 
    print output.toprettyxml(indent="    ", encoding="utf-8")

def createRoot(output) : 
    html = output.createElement("html")
    html.setAttribute("xmlns", "http://www.w3.org/1999/xhtml")
    return html

# this function creates the heading of the file and return the html (root) element 
def createHead(output) : 
    html = output.createElement("html")
    html.setAttribute("xmlns", "http://www.w3.org/1999/xhtml")
    head  = output.createElement("head")
    meta = output.createElement("meta")
    meta.setAttribute("http-equiv", "Content-Type")
    meta.setAttribute("content", "text/html;charset=utf-8")
    head.appendChild(meta)
    link = output.createElement("link")
    link.setAttribute("href", "http://www.x3dom.org/x3dom/release/x3dom.css")
    link.setAttribute("type", "text/css")
    link.setAttribute("rel", "stylesheet")
    head.appendChild(link)
    script = output.createElement("script")
    script.setAttribute("src", "http://www.x3dom.org/x3dom/release/x3dom.js")
    script.setAttribute("type", "text/javascript")
    head.appendChild(script)
    script = output.createElement("script")
    script.setAttribute("src", "extra-x3dom-nodes.js")
    script.setAttribute("type", "text/javascript")
    head.appendChild(script)
    
    return head 

def createBody(output) : 
    body = output.createElement("body")
    return body

def combine(html, head, body) : 
    html.appendChild(head)
    html.appendChild(body)
    return html

def createDoc() : 
    output = Document() 
    html = createRoot(output)
    head = createHead(output)
    body = createBody(output)
    html = combine(html, head, body) 
    output.appendChild(html)
    return output  

def createX3D(output) : 
    body = output.getElementsByTagName("body")[0]
    X3D = output.createElement("X3D") 
    X3D.setAttribute("xmlns", "http://www.web3d.org/specifications/x3d-namespace")
    X3D.setAttribute("id", "someUniqueId")
    X3D.setAttribute("showStat", "false")
    X3D.setAttribute("showLog", "false")
    X3D.setAttribute("x", "0px")
    X3D.setAttribute("y", "0px")
    X3D.setAttribute("width", "400px")
    X3D.setAttribute("height", "400px")
    body.appendChild(X3D) 
   
def importScene(inputDoc, output): 
    scene = inputDoc.getElementsByTagName("Scene")[0]
    X3D = output.getElementsByTagName("X3D")[0]
    X3D.appendChild(scene)
    output=checkScripts(output)
    return output     

def addDelaySensor(output, script) :
    delay = output.createElement("DelaySensor")
    delay.setAttribute("DEF", script.getAttribute("DEF"))
    for node in script.parentNode.childNodes : 
        if node.nodeName == 'TimeSensor':
            delayTime = node.getAttribute("cycleInterval")
            delay.setAttribute("delay",delayTime )
            node.parentNode.removeChild(node)
        # if node.nodeName == 'ROUTE': 
        #     if node.getAttribute("fromField") == '"delayCompleteTime"' : 
        #         node.setAttribute("fromField", "isActive") 
        #         node.setAttribute("toField", "isActive")
    # script.parentNode.replaceChild(script, delay)  
    script.parentNode.appendChild(delay)
    delay.parentNode.removeChild(script)
    return output

def checkScripts(output) : 
    if (output.getElementsByTagName("Script") != None ) : 
        for script in output.getElementsByTagName("Script") : 
            if script.getAttribute("url") == '"DelaySensor.js"': 
                output= addDelaySensor(output, script)
    return output


# starting conversion 
doc = minidom.parse(inputFile)
output = createDoc()
createX3D(output) 
output = importScene(doc, output)
# printOutput(output)

outputFile = os.path.splitext(inputFile)[0] + ".xhtml"
out_file = open(outputFile, "w") 
out_file.write(output.toprettyxml(indent="    ", encoding="utf-8"))
out_file.close()



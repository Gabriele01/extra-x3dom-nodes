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
    script.setAttribute("src", "/Users/Ghost/Documents/SynArea/extra-x3dom-nodes/extra-x3dom-nodes.js")
    script.setAttribute("type", "text/javascript")
    head.appendChild(script)
    
    return head 

# creating the body of the file 
def createBody(output) : 
    body = output.createElement("body")
    return body

def combine(html, head, body) : 
    html.appendChild(head)
    html.appendChild(body)
    return html

# creating the output document 
def createDoc() : 
    output = Document() 
    html = createRoot(output)
    head = createHead(output)
    body = createBody(output)
    html = combine(html, head, body) 
    output.appendChild(html)
    return output  

# defining the x3d tag with its properties 
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

# importing the x3d scene from the input file in x3d  
def importScene(inputDoc, output): 
    scene = inputDoc.getElementsByTagName("Scene")[0]
    X3D = output.getElementsByTagName("X3D")[0]
    X3D.appendChild(scene)
    output=checkScripts(output)
    return output     

def addDelaySensor(output, script) :
    for node in script.parentNode.childNodes : 
        if node.nodeName == 'TimeSensor':
            delayTime = float(node.getAttribute("cycleInterval"))
            loop = node.getAttribute("loop")
            node.parentNode.removeChild(node)
            
        if node.nodeName == 'ROUTE': 
            if node.getAttribute("fromField") == "delayCompleteTime": 
                timeSensor = node.getAttribute("toNode")
    parent = script.parentNode 
    parent.parentNode.removeChild(parent) 
    script.parentNode.removeChild(script) 
    output = addDelayScript(output, delayTime,loop,  timeSensor)  
    return output 

def addDelayScript(output, delayTime, loop, timeSensor): 
    delayScript = output.createElement("script")
    for node in output.getElementsByTagName("TimeSensor") : 
        if node.getAttribute("DEF") == timeSensor : 
            clock = node  
    name = clock.getAttribute("DEF")
    clock.setAttribute("id", name)
    script = output.createTextNode(scriptText(name, delayTime, loop))
    delayScript.appendChild(script); 
    body = output.getElementsByTagName("body")[0] 
    body.appendChild(delayScript)
    return output

def scriptText(name, delayTime, loop) : 
    string =("\n\t\t(function() {{\n"
             "\t\t\tstartTime = new Date().getTime() /1000 + {0} ;\n"
             "\t\t\tdocument.getElementById(\"{1}\").setAttribute( \"startTime\", startTime);\n"
             "\t\t\tdocument.getElementById(\"{1}\").setAttribute( \"loop\", \"{2}\");\n"
             "\t\t}})();".format(delayTime, name, loop))

    return string 



def checkScripts(output) : 
    if (output.getElementsByTagName("Script") != None ) : 
        for script in output.getElementsByTagName("Script") : 
            print script.toxml()
            if script.getAttribute("url") == "DelaySensor.js": 
                print script.toxml()
                output= addDelaySensor(output, script)
    return output

def checkErrors(output):
    # error generated by the 3doors converter in : NavigationInfo in : type ='"EXAMINE ANY"' -> '"EXAMINE" "ANY"'
    for node in output.getElementsByTagName("NavigationInfo") : 
        if node.getAttribute("type") == '"EXAMINE ANY"': 
            node.setAttribute("type", '"EXAMINE" "ANY"') 
    return output 

# starting conversion 
print "Starting conversion from x3d to xhtml.."
doc = minidom.parse(sys.argv[1])
output = createDoc()
createX3D(output) 
output = importScene(doc, output)
output = checkErrors(output)
# printOutput(output)

outputFile = os.path.splitext(inputFile)[0] + ".xhtml"
out_file = open(outputFile, "w") 
out_file.write(output.toprettyxml())
out_file.close()
print "Conversion completed without errors"


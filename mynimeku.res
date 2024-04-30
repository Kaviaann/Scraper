 [
    Text {
        parent: Element {
            parent: [Element],
            prev: [Text],
            next: [Text],
            startIndex: null,
            endIndex: null,
            children: [Circular *1],
            name: 'div',
            attribs: [Object: null prototype],
            type: 'tag',
            namespace: 'http://www.w3.org/1999/xhtml',
            'x-attribsNamespace': [Object: null prototype],
            'x-attribsPrefix': [Object: null prototype]
        },
        prev: null,
        next: Element {
            parent: [Element],
            prev: [Circular *2],
            next: [Text],
            startIndex: null,
            endIndex: null,
            children: [Array],
            name: 'div',
            attribs: [Object: null prototype],
            type: 'tag',
            namespace: 'http://www.w3.org/1999/xhtml',
            'x-attribsNamespace': [Object: null prototype],
            'x-attribsPrefix': [Object: null prototype]
        },
        startIndex: null,
        endIndex: null,
        data: ' \n',
        type: 'text'
    },

    Element {
        parent: Element {
            parent: [Element],
            prev: [Text],
            next: [Text],
            startIndex: null,
            endIndex: null,
            children: [Circular *1],
            name: 'div',
            attribs: [Object: null prototype],
            type: 'tag',
            namespace: 'http://www.w3.org/1999/xhtml',
            'x-attribsNamespace': [Object: null prototype],
            'x-attribsPrefix': [Object: null prototype]
        },
        prev: <ref *2> Text {
            parent: [Element],
            prev: null,
            next: [Circular *3],
            startIndex: null,
            endIndex: null,
            data: ' \n',
            type: 'text'
        },
        next: Text {
            parent: [Element],
            prev: [Circular *3],
            next: [Element],
            startIndex: null,
            endIndex: null,
            data: '\n',
            type: 'text'
        },
    startIndex: null,
    endIndex: null,
    children: [ [Text] ],
    name: 'div',
    attribs: [Object: null prototype] { class: 'type Movie' },
    type: 'tag',
    namespace: 'http://www.w3.org/1999/xhtml',
    'x-attribsNamespace': [Object: null prototype] { class: undefined },
    'x-attribsPrefix': [Object: null prototype] { class: undefined }
  }
 ]















 // new Promise(res => {
    //     for(let i in content){

    //         if(!'01234567890'.includes(i)) return
    //         const data = {

    //         }

    //         const el = content[i]

    //         const con = el.children.filter(v => v.type === 'tag')

    //         console.log(el)
    //         console.log('\n\n\n\n\n')

    //         // if(el.attribs.class){
                
                
    //         //     const info = side.filter(v => v.type === 'tag')[1]
    //         //     const isSeason = info.children.filter(v => v.type === "tag").length > 1


    //         //     if(!side.map(v => v.attribs).filter(v => v)) return


    //         //     // * GET SEASON
    //         //     if(isSeason){
    //         //         // console.log(info.children.filter(v => v.type === "tag" && v.attribs.class === "season").shift().children.shift().children[0].data)
    //         //     }


    //         //     // * GET Rating
    //         //     // console.log(info.children[1].children.filter(v => v.type === 'text')[0].data.trim())

                

    //         // } 
    //         // // else if(!el.attribs) continue
    //         // else if(el.attribs.title){

    //         //     data.title = el.attribs.title

    //         // }



    
    //     }
    //     res()
    // })
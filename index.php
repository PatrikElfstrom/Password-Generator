<!DOCTYPE html>
<html>
    <head>
        <title>Password Generator</title>
        <meta charset="utf-8">
        <meta name="description" content="A 100% secure and powerful password generator.">
        <meta name="viewport" content="width=device-width">
		<meta name="author" content="Patrik Elfström" />
        
        <meta property="og:title" content="Password Generator"/>
        <meta property="og:url" content="http://passwordgenerator.patrikelfstrom.se"/>
        <meta property="og:site_name" content="Password Generator"/>
        <meta property="og:type" content="portfolio"/>
        <meta property="og:description" content="A 100% secure and powerful password generator."/>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@PatrikElfstrom" />
        <meta name="twitter:description" content="A 100% secure and powerful password generator." />
        <meta name="twitter:creator" content="@PatrikElfstrom">
        <meta name="twitter:title" content="Password Generator" />
        <meta name="twitter:url" content="http://passwordgenerator.patrikelfstrom.se" />
        
        <link rel="stylesheet" media="all" href="/css/bootstrap.min.css">
        <link rel="stylesheet" media="all" href="/css/main.css">
        <link type="text/plain" rel="author" href="/humans.txt" />
        
        
		<title><?=$headData['title']?></title>
		<meta charset="utf-8" />
		<meta name="description" content="<?=$headData['description']?>" />
		<meta name="viewport" content="width=device-width" />
    </head>
    <body>
        <div class="container">
            <header class="page-header" role="banner">
                <h1 id="dropdowns">Password Generator</h1>
            </header>
            <div class="row" role="main">
                <form id="passwordgenerator" method="GET" class="form-horizontal">
                    <div class="form-group">
                        <label for="length" class="col-lg-2 control-label">Password Length</label>
                        <div class="col-lg-10">
                            <input type="text" class="form-control" id="length" value="8" name="length" size="3">
                            <span class="help-block">Length of password(s).</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <div class="col-lg-offset-2 col-lg-10">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" checked="checked" name="letters"> Include Lower Case Letters
                                    <span class="help-block">E.g. abcdef</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <div class="col-lg-offset-2 col-lg-10">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" checked="checked" name="uppercase"> Include Upper Case Letters
                                    <span class="help-block">E.g. ABCDEF</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <div class="col-lg-offset-2 col-lg-10">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" checked="checked" name="numbers"> Include Numbers
                                    <span class="help-block">E.g. 234567</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <div class="col-lg-offset-2 col-lg-10">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" name="punctuation"> Include Punctuation
                                    <span class="help-block">E.g. ;(_>#]</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <div class="col-lg-offset-2 col-lg-10">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" checked="checked" name="similar"> Include Similar Characters
                                    <span class="help-block">E.g. i, l, o, 1, 0, I</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="quantity" class="col-lg-2 control-label">Quantity</label>
                        <div class="col-lg-10">
                            <input type="text" class="form-control" id="quantity" value="1" name="quantity" size="3">
                            <span class="help-block">Number of passwords to generate.</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <div class="col-lg-offset-2 col-lg-10">
                            <input type="reset" class="btn btn-warning" value="Reset">
                            <input type="submit" class="btn btn-primary" value="Generate Password(s)">
                        </div>
                    </div>
                </form>
                
                <div class="result">
                    <h3 class="page-header">Generated Password(s)</h3>
                    <ul id="generated-passwords" class="list-group list-striped"></ul>
                </div>
            </div>
            
            <footer class="row simple-social-icons" role="contentinfo">
                <ul class="aligncenter">
                    <li class="social-gplus"><a target="_blank" href="https://plusone.google.com/_/+1/confirm?hl=en&url=http://passwordgenerator.patrikelfstrom.se">&#xf30f;</a></li>
                    <li class="social-twitter"><a target="_blank" href="http://twitter.com/home?status=Password Generator%3A%20http://passwordgenerator.patrikelfstrom.se">&#xf309;</a></li>
                    <li class="social-facebook"><a target="_blank" href="http://www.facebook.com/sharer.php?u=http://passwordgenerator.patrikelfstrom.se&title=Password Generator">&#xf30c;</a></li>
                </ul>
                <small><a href="https://patrikelfstrom.se">Patrik Elfström</a></small>
            </footer>
        </div>
        
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
        <script src="/js/bootstrap.min.js"></script>
        <script src="/js/passwordgenerator.js"></script>
		<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'UA-2643871-15', 'patrikelfstrom.se');ga('send', 'pageview');</script>
    </body>
</html>